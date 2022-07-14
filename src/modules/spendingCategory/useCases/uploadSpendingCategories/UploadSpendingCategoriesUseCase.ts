import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ISpendingCategoryRepository } from "../../repository/ISpendingCategoryRepository";

interface IUploadSpendingCategoires {
    description: string;
    icon: string;
    name: string;
}

@injectable()
class UploadSpendingCategoriesUseCase {
    constructor(
        @inject("SpendingCategoryRepository")
        private spendingCategoryRepository: ISpendingCategoryRepository
    ) {}

    loadCategories(
        file: Express.Multer.File
    ): Promise<IUploadSpendingCategoires[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IUploadSpendingCategoires[] = [];

            const parseFile = csvParse({
                delimiter: ",",
                trim: true,
            });

            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [name, description, icon] = line;
                    categories.push({
                        name,
                        description,
                        icon,
                    });
                })
                .on("end", () => {
                    fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File) {
        const categories = await this.loadCategories(file);
        categories.map(async (category) => {
            const { name, description, icon } = category;
            const existCategory =
                await this.spendingCategoryRepository.findByName(name);

            if (!existCategory) {
                await this.spendingCategoryRepository.create({
                    name,
                    description,
                    icon,
                });
            }
        });
    }
}

export { UploadSpendingCategoriesUseCase };
