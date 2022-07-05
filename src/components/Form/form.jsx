import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {service} from '../../services/service'

export default function FormSignUp() {
	const [showPassword, setShowPassword] = useState(false);
	const [address, setAddress] = useState({});
	const toast = useToast()

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
				<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
					<Box
							rounded={'lg'}
							bg={useColorModeValue('white', 'gray.700')}
							boxShadow={'lg'}
							p={8}>
						<Stack spacing={4}>
							<Stack align={'center'}>
								<Heading fontSize={'4xl'} textAlign={'center'}>
									Cadastre-se
								</Heading>
								<Text fontSize={'md'} color={'gray.600'}>
									para acessar nossos recursos maneiros ✌️
								</Text>
							</Stack>
							<HStack>
								<Box>
									<FormControl id="firstName" isRequired>
										<FormLabel>Nome</FormLabel>
										<Input type="text" />
									</FormControl>
								</Box>
								<Box>
									<FormControl id="lastName">
										<FormLabel>Sobrenome</FormLabel>
										<Input type="text" />
									</FormControl>
								</Box>
							</HStack>
							<FormControl id="email" isRequired>
								<FormLabel>Email</FormLabel>
								<Input type="email" />
							</FormControl>
							<FormControl id="password" isRequired>
								<FormLabel>Senha</FormLabel>
								<InputGroup>
									<Input type={showPassword ? 'text' : 'password'} />
									<InputRightElement h={'full'}>
										<Button
												variant={'ghost'}
												onClick={() =>
														setShowPassword((showPassword) => !showPassword)
												}>
											{showPassword ? <ViewIcon /> : <ViewOffIcon />}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<FormControl id="passwordConfirmation" isRequired>
								<FormLabel>Confirmar Senha</FormLabel>
								<InputGroup>
									<Input type={showPassword ? 'text' : 'password'} />
									<InputRightElement h={'full'}>
										<Button
												variant={'ghost'}
												onClick={() =>
														setShowPassword((showPassword) => !showPassword)
												}>
											{showPassword ? <ViewIcon /> : <ViewOffIcon />}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
							<HStack>
								<FormControl id="cep" isRequired>
									<FormLabel>CEP</FormLabel>
									<Input type="text" maxLength={8} onChange={(e) => checkCep(e)}/>
								</FormControl>
								<FormControl id="street" isDisabled>
									<FormLabel>Rua</FormLabel>
									<Input type="text" value={address.logradouro || ''}/>
								</FormControl>
							</HStack>
							<FormControl>
								<FormLabel>Complemento</FormLabel>
								<Input type="text" />
							</FormControl>
							<HStack>
								<FormControl id="neighborhood" isDisabled>
									<FormLabel>Bairro</FormLabel>
									<Input type="text" value={address.bairro || ''}/>
								</FormControl>
								<FormControl id="number">
									<FormLabel>Número</FormLabel>
									<Input type="text" />
								</FormControl>
							</HStack>
							<HStack>
									<FormControl id="city" isDisabled>
										<FormLabel>Cidade</FormLabel>
										<Input type="text" value={address.localidade || ''}/>
									</FormControl>
								<FormControl id="state" isDisabled>
									<FormLabel>Estado</FormLabel>
									<Input type="text" value={address.uf || ''}/>
								</FormControl>
							</HStack>
							<Stack spacing={10} pt={2}>
								<Button
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
						</Stack>
					</Box>
				</Stack>
			</Flex>
	);
}