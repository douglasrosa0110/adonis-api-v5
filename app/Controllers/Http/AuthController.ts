import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.all()
    
    try {
      const user = await User.query()
      .where('email', email)
      .whereNull('deleted_at')
      .firstOrFail()

      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '7days',
        name: user?.serialize().email
      })

      return { 
        meta: { user: user?.serialize() },
        data: token 
      }
    } catch (e) {
      return response.status(400).send({ message: 'Invalid credentials' })
    }
  }

  public async logout({ auth }: HttpContextContract) {
    auth.logout()
  }
}