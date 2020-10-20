import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanage_views from '../views/orphanages_views';
import * as Yup from 'yup';

class OrphanagesController {
    async index(request: Request, response: Response, next: NextFunction) {

        try {
            const orphanageRepository = getRepository(Orphanage);
            const orphanages = await orphanageRepository.find({
                relations: ['images']
            });
            return response.status(200).json(orphanage_views.renderMany(orphanages));
        } catch (err) {
            next(err)
        }

    }

    async show(request: Request, response: Response, next: NextFunction) {

        try {
            const { id } = request.params;
            const orphanageRepository = getRepository(Orphanage);
            const orphanage = await orphanageRepository.findOneOrFail(id, {
                relations: ['images']
            });
            return response.status(200).json(orphanage_views.render(orphanage));
        } catch (err) {
            next(err)
        }



    }
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const {
                name,
                latitude,
                longitude,
                about,
                whatsapp,
                instructions,
                opening_hours,
                open_on_weekends
            } = request.body;

            const orphanageRepository = getRepository(Orphanage);

            const requestImages = request.files as Express.Multer.File[];

            const images = requestImages.map(image => {
                return { path: image.filename }
            });

            const data = {
                name,
                latitude,
                longitude,
                about,
                whatsapp,
                instructions,
                opening_hours,
                open_on_weekends: open_on_weekends === 'true',
                images
            };

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                latitude: Yup.number().required(),
                longitude: Yup.number().required(),
                about: Yup.string().required().max(300),
                whatsapp: Yup.string().required(),
                instructions: Yup.string().required(),
                opening_hours: Yup.string().required(),
                open_on_weekends: Yup.boolean().required(),
                images: Yup.array(

                    Yup.object().shape({
                        path: Yup.string().required()
                    })

                )

            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const orphanage = orphanageRepository.create(data);

            await orphanageRepository.save(orphanage);

            return response.status(201).json(orphanage);
        } catch (err) {
            next(err)
        }

    }


}
export default OrphanagesController;