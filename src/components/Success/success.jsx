import { Box, Heading, Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'

const Success = () => {
	return (
				<Box
						textAlign="center"
						py={10}
						px={6}
						my={190}
						mx={'auto'}
						rounded={'lg'}
						boxShadow={'lg'}
						maxW={'lg'}
						bg={'white'}
				>
					<CheckCircleIcon boxSize={'50px'} color={'green.500'} />
					<Heading as="h2" size="xl" mt={6} mb={2}>
						Tudo certo!
					</Heading>
					<Text color={'gray.500'}>
						Recebemos suas informações, agora é só ficar de olho no seu email e confirmar sua conta.
					</Text>
				</Box>
		)
}

export default Success;