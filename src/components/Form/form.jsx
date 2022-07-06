import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	HStack,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Text,
	useColorModeValue,
	useToast
} from '@chakra-ui/react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {Field, Form, Formik} from 'formik';
import * as yup from 'yup';
import {service} from '../../services/service'

const SignupSchema = yup.object().shape({
	firstName: yup.string()
			.min(2, 'Muito Curto')
			.required('Obrigatório'),
	lastName: yup.string()
			.min(2, 'Muito Curto')
			.required('Obrigatório'),
	email: yup.string()
			.email('Email Invalido')
			.required('Obrigatório'),
	password: yup.string()
			.min(6, 'Muito Curto')
			.required('Obrigatório'),
	passwordConfirmation: yup.string()
			.min(6, 'Muito Curto')
			.oneOf([yup.ref('password'), null], 'Senhas não conferem')
			.required('Obrigatório'),
	street: yup.string()
			.required('Obrigatório'),
	neighborhood: yup.string()
			.required('Obrigatório'),
	number: yup.string()
			.required('Obrigatório'),
	complement: yup.string(),
	city: yup.string()
			.required('Obrigatório'),
	state: yup.string()
			.required('Obrigatório'),
});

const FormSignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [address, setAddress] = useState({
		"cep": "",
		"logradouro": "",
		"complemento": "",
		"bairro": "",
		"localidade": "",
		"uf": "",
		"ibge": "",
		"gia": "",
		"ddd": "",
		"siafi": ""
	});
	const toast = useToast()
	const navigate = useNavigate();

	const checkCep = async (e) => {
		const cep = e.target.value;
		if (cep.length === 8) {
			const response = await service.get(`${cep}/json/`);

			if ('erro' in response.data) {
				toast({
					title: 'CEP Inválido',
					description: "CEP não encontrado",
					status: 'error',
					position: 'top',
					duration: 9000,
					isClosable: true,
				})
			}

			setAddress(response.data);
		}
	}

	return (
			<Flex
					minH={'100vh'}
					align={'center'}
					justify={'center'}>
				<Stack spacing={5} mx={'auto'} maxW={'lg'} py={4} px={6}>
					<Box boxShadow={'lg'}
					     p={6}
					     rounded={'lg'}
					     bg={useColorModeValue('white', 'gray.700')}>
						<Stack align={'center'}>
							<Heading fontSize={'4xl'} textAlign={'center'}>
								Cadastre-se
							</Heading>
							<Text fontSize={'md'} color={'gray.600'}>
								para acessar nossos recursos maneiros ✌️
							</Text>
						</Stack>
					</Box>
					<Box
							rounded={'lg'}
							bg={useColorModeValue('white', 'gray.700')}
							boxShadow={'lg'}
							p={8}>
						<Stack spacing={4}>
							<Formik
									initialValues={{
										firstName: '',
										lastName: '',
										email: '',
										password: '',
										passwordConfirmation: '',
										street: address.logradouro ? address.logradouro : '',
										neighborhood: address.bairro ? address.bairro : '',
										number: '',
										complement: '',
										city: address.localidade ? address.localidade : '',
										state: address.uf ? address.uf : '',
									}}
									validationSchema={SignupSchema}
									enableReinitialize={true}
									onSubmit={values => {
										console.log(values);
										navigate('/success');
									}}
							>
								{(props) => (
										<Form>
											<HStack>
												<Field name="firstName">
													{({field, form}) => (
															<FormControl isRequired
															             isInvalid={Boolean(form.errors.firstName && form.touched.firstName)}>
																<FormLabel htmlFor='firstName'>Nome</FormLabel>
																<Input {...field} type="text" id='firstName' placeholder='Nome'/>
																<FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
															</FormControl>
													)}
												</Field>
												<Field name="lastName">
													{({field, form}) => (
															<FormControl isRequired
															             isInvalid={Boolean(form.errors.lastName && form.touched.lastName)}>
																<FormLabel htmlFor='lastName'>Sobrenome</FormLabel>
																<Input {...field} type="text" id='lastName' placeholder="Sobrenome"/>
																<FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
															</FormControl>
													)}
												</Field>
											</HStack>
											<Field name='email'>
												{({field, form}) => (
														<FormControl isRequired isInvalid={form.errors.email && form.touched.email}>
															<FormLabel htmlFor='email'>Email</FormLabel>
															<Input {...field} type="email" id='email' placeholder='Seu melhor email'/>
															<FormErrorMessage>{form.errors.email}</FormErrorMessage>
														</FormControl>
												)}
											</Field>
											<Field name='password'>
												{({field, form}) => (
														<FormControl isRequired isInvalid={form.errors.password && form.touched.password}>
															<FormLabel htmlFor='password'>Senha</FormLabel>
															<InputGroup>
																<Input {...field} type={showPassword ? 'text' : 'password'} id='password'
																       placeholder='Senha'/>
																<InputRightElement h={'full'}>
																	<Button
																			variant={'ghost'}
																			onClick={() =>
																					setShowPassword((showPassword) => !showPassword)
																			}>
																		{showPassword ? <ViewIcon/> : <ViewOffIcon/>}
																	</Button>
																</InputRightElement>
															</InputGroup>
															<FormErrorMessage>{form.errors.password}</FormErrorMessage>
														</FormControl>
												)}
											</Field>
											<Field name='passwordConfirmation'>
												{({field, form}) => (
														<FormControl isRequired
														             isInvalid={form.errors.passwordConfirmation && form.touched.passwordConfirmation}>
															<FormLabel htmlFor='passwordConfirmation'>Confirmar Senha</FormLabel>
															<InputGroup>
																<Input {...field} type={showPassword ? 'text' : 'password'} id='passwordConfirmation'
																       placeholder='Confirme sua senha'/>
																<InputRightElement h={'full'}>
																	<Button
																			variant={'ghost'}
																			onClick={() =>
																					setShowPassword((showPassword) => !showPassword)
																			}>
																		{showPassword ? <ViewIcon/> : <ViewOffIcon/>}
																	</Button>
																</InputRightElement>
															</InputGroup>
															<FormErrorMessage>{form.errors.passwordConfirmation}</FormErrorMessage>
														</FormControl>
												)}
											</Field>
											<HStack>
												<FormControl id="cep" isRequired>
													<FormLabel>CEP</FormLabel>
													<Input type="text" maxLength={8} onChange={(e) => checkCep(e)}/>
												</FormControl>
												<Field name="street">
													{({field, form}) => (
															<FormControl isDisabled isInvalid={form.errors.street && form.touched.street}>
																<FormLabel htmlFor='street'>Rua</FormLabel>
																<Input {...field} type="text" id='street' placeholder='Rua'/>
																<FormErrorMessage>{form.errors.street}</FormErrorMessage>
															</FormControl>
													)}
												</Field>
											</HStack>
											<Field name="complement">
												{({field, form}) => (
														<FormControl isInvalid={form.errors.complement && form.touched.complement}>
															<FormLabel htmlFor='complement'>Complemento</FormLabel>
															<Input {...field} id='complement' type="text" placeholder='Ex: Prox. Praça da Bandeira'/>
															<FormErrorMessage>{form.errors.complement}</FormErrorMessage>
														</FormControl>
												)}
											</Field>
											<HStack>
												<Field name="neighborhood">
													{({field, form}) => (
															<FormControl isDisabled isInvalid={form.errors.neighborhood && form.touched.neighborhood}>
																<FormLabel htmlFor='neighborhood'>Bairro</FormLabel>
																<Input {...field} id='neighborhood' type="text" placeholder='Bairro'/>
																<FormErrorMessage>{form.errors.neighborhood}</FormErrorMessage>
															</FormControl>
													)}
												</Field>
												<Field name="number">
													{({field, form}) => (
															<FormControl isInvalid={form.errors.number && form.touched.number}>
																<FormLabel htmlFor='number'>Número</FormLabel>
																<Input {...field} type="text" id='number' placeholder='Ex: 1010'/>
																<FormErrorMessage>{form.errors.number}</FormErrorMessage>
															</FormControl>
													)}
												</Field>
											</HStack>
											<HStack>
												<Field name="city">
													{({field, form}) => (
															<FormControl isDisabled isInvalid={form.errors.city && form.touched.city}>
																<FormLabel htmlFor='city'>Cidade</FormLabel>
																<Input {...field} type="text" id="city" placeholder='Cidade'/>
																<FormErrorMessage>{form.errors.city}</FormErrorMessage>
															</FormControl>
													)}
												</Field>
												<Field name="state">
													{({field, form}) => (
															<FormControl isDisabled isInvalid={form.errors.state && form.touched.state}>
																<FormLabel htmlFor='state'>Estado</FormLabel>
																<Input {...field} type="text" id="state" placeholder='Estado'/>
																<FormErrorMessage>{form.errors.state}</FormErrorMessage>
															</FormControl>
													)}
												</Field>
											</HStack>
											<Stack spacing={10} pt={7}>
												<Button
														type="submit"
														loadingText="Submitting"
														size="lg"
														id='submit'
														bg={'blue.400'}
														color={'white'}
														_hover={{
															bg: 'blue.500',
														}}>
													Cadastrar
												</Button>
											</Stack>
										</Form>
								)}
							</Formik>
						</Stack>
					</Box>
				</Stack>
			</Flex>
	);
}

export default FormSignUp;