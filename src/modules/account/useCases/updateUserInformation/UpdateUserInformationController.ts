import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserInformationUseCase } from "./UpdateUserInformationUseCase";

class UpdateUserInformationController {

    async handle(request: Request, response: Response) {
        const { 
                avatar, 
                email, 
                name, 
                password, 
                phone } = request.body
                
        const { id } = request.user

        const updateUserInformationUseCase = container.resolve(UpdateUserInformationUseCase)

        const userUpdated = await updateUserInformationUseCase.execute({
            id_user: id,
            avatar, 
            email, 
            name, 
            password, 
            phone
        })

        return response.status(201).send()
    }
}


export { UpdateUserInformationController }