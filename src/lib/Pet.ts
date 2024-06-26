import { downloadFile } from "./util";

export type PetJson = {
    id: string,
    imageUrl: string,
    title: string,
    desc: string,
    url: string,
    createdTimestamp: string,
};

export type PetsListJson = PetJson[];


export class Pet {
    constructor(
        readonly id: string,
        readonly imageUrl: string,
        readonly title: string,
        readonly desc: string,
        readonly url: string,
        readonly createdTimestamp: Date,
    ) {}

    static listJson(pets: PetsListJson) {
        return pets.map(Pet.json);
    }

    static json(pet: PetJson) {
        return new Pet(
            pet.id,
            pet.imageUrl,
            pet.title,
            pet.desc,
            pet.url,
            new Date(pet.createdTimestamp),
        );
    }

    downloadImage() {
        downloadFile(this.imageUrl, `${this.title}.jpg`);
    }
}