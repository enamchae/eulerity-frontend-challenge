export type PetJson = {
    id: string,
    imageUrl: string,
    title: string,
    desc: string,
    createdTimestamp: string,
};

export type PetsListJson = PetJson[];


export class Pet {
    constructor(
        readonly id: string,
        readonly imageUrl: string,
        readonly title: string,
        readonly desc: string,
        readonly createdTimestamp: Date,
    ) {}

    static listJson(pets: PetsListJson) {
        return pets.map(pet => new Pet(
            pet.id,
            pet.imageUrl,
            pet.title,
            pet.desc,
            new Date(pet.createdTimestamp),
        ));
    }
}