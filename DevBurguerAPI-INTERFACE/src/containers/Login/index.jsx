import { set, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useUser } from "../../hooks/UserContext";
import { api } from "../../services/api";
import { Container, Form, InputContainer, LeftContainer, RightContainer, Title, Link } from './styles'
import { Button } from '../../components/Button'
import Logo from '../../assets/logo.svg'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();
    const { putUserData } = useUser();

    const schema = yup.object({
        email: yup.string().email('Digite um e-mail Válido').required('O e-mail é obrigatorio'),
        password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Digite uma senha'),
    }).required();

    const {
        register, handleSubmit, formState: { errors } } = useForm({
            resolver: yupResolver(schema)
        });
    const onSubmit = async data => {

        const { data: userData } = await toast.promise(
            api.post('/session', {
                email: data.email,
                password: data.password,
            }),
            {
                pending: 'Verifique seus dados',
                success: {
                    render() {
                        setTimeout(() => {
                            if (userData.admin) {

                                navigate('/admin/pedidos');

                            } else {
                                navigate('/');
                            }

                        }, 2000);
                        return 'Seja bem-vindo(a) 👌'
                    }
                },
                error: 'Email ou senha incorretos 🤯'
            },
        );

        putUserData(userData);

    };

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt="logo-devburguer" />
            </LeftContainer>
            <RightContainer>
                <Title>
                    Olá, seja bem vindo ao <span> Dev Burguer!</span>
                    <br />Acesse com seu <span> Login e senha.</span>
                </Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputContainer>
                        <label>Email</label>
                        <input type="email" {...register("email")} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Senha</label>
                        <input type="password" {...register("password")} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>
                    <Button type="submit">Entrar</Button>
                </Form>
                <p>Não Possui Conta?<Link to={"/cadastro"}>Clique Aqui</Link>
                </p>
            </RightContainer>
        </Container>
    );
}