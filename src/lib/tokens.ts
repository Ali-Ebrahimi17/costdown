import { randomBytes } from 'crypto'

export const generateToken = (days: number) => {
	const string = randomBytes(48).toString('hex')

	//   expires in 24 hours
	const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * days)

	return {
		string,
		expires,
	}
}
