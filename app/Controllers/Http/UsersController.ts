import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { Exception } from '@poppinss/utils'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const limit = request.input('limit', 20)
    const page = request.input('page', 1)
    return Database
      .from('users')
      .select('*')
      .orderBy('id', 'desc')
      .paginate(page, limit)
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findBy('id', params.id)
    if(!user) throw new Exception('Not found!', 404)
    
    return user;
  }

  public async create({ request }: HttpContextContract) {
    const { email, password, name } = request.all()
    const user = await User.create({ email, name, password });
    return user;
  }

  public async update({ request, params }: HttpContextContract) {
    const { email, password, name, deleted_at } = request.all()
    const user = await User.findBy('id', params.id)
    if(!user) throw new Exception('Not found!', 404)
    
    user.email = email
    user.password = password
    user.name = name
    user.deleted_at = deleted_at

    await user.save()
    return user;
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findBy('id', params.id)
    if(!user) throw new Exception('Not found!', 404)
    
    user.deleted_at = DateTime.now()
    await user.save()

    return user;
  }
}