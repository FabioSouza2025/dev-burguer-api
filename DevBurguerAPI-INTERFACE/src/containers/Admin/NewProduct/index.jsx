import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Image } from "@phosphor-icons/react";
import { Container, Form, InputGroup, Label, Input, LabelUpload, Select, SubmitButton, ErrorMessage, ContainerCheckbox, } from './styles';
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
    name: yup.string().required('Digite o nome do produto'),
    price: yup.number().positive().required('Digite o preço do produto').typeError('Digite o preço do produto'),
    category: yup.object().required('escolha uma cateria'),
    offer: yup.bool(),
    file: yup.mixed()
        .test('required', 'Escolha um arquivo', value => {
            return value && value.length > 0;
        }).test('fileSize', 'Carregue arquivos ate 5mb', value => {
            return value && value.length > 0 && (value[0].size <= 50000);
        }).test('type', 'Carregue apenas imagens jpg ou  png', value => {
            return value && value.length > 0 && (value[0].type === 'image/jpeg' || value[0].type === 'image/png');
        }),
});


export function NewProduct() {

    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get('/categories');


            setCategories(data);
        }

        loadCategories();
    }, []);

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async data => {
        const productFormData = new FormData();

        productFormData.append('name', data.name);
        productFormData.append('price', data.price * 100);
        productFormData.append('category_id', data.category.id);
        productFormData.append('file', data.file[0]);
        productFormData.append('offer', data.offer);


        await toast.promise(api.post('/products', productFormData), {
            pending: 'Adicionando produto...',
            success: 'Produto cadastrado com sucesso!',
            error: 'Erro ao cadastrar produto'
        });

        setTimeout(() => {
            navigate('/admin/produtos', {

            });
        }, 2000);

    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup>
                    <Label>Nome</Label>
                    <Input type="text" {...register("name")} />
                    <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <Label>Preço</Label>
                    <Input type="nymber" {...register("price")} />
                    <ErrorMessage>{errors?.price?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <LabelUpload>
                        <Image />
                        <input type="file" {...register("file")}
                            accept="image/png, image/jpg"
                            onChange={(value) => {
                                setFileName(value.target.files[0]?.name);

                                register("file").onChange(value);
                            }}
                        />

                        {fileName || 'Upload da image do Produto'}
                    </LabelUpload>
                    <ErrorMessage>{errors?.file?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <Label>categoria</Label>
                    <ErrorMessage>{errors?.category?.message}</ErrorMessage>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={categories}
                                getOptionLabel={(category) => category.name}
                                getOptionValue={(category) => category.id}
                                placeholder="Categorias"
                                menuPortalTarget={document.body}

                            />
                        )}

                    />
                </InputGroup>
                <InputGroup>
                    <ContainerCheckbox>
                        <input type="checkbox" {...register("offer")} />
                        <Label>Produto em Oferta</Label>
                    </ContainerCheckbox>
                </InputGroup>

                <SubmitButton>Adicionar Produto</SubmitButton>
            </Form>
        </Container>
    )
}