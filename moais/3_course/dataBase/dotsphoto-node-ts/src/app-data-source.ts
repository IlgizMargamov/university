import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "sqlite",
    database : "C:\\Users\\Gizon\\Desktop\\test2.db",
    entities: ["dist/orm/entities/*.js"],
    logging: true,
    synchronize: true,
})

//await myDataSource.initialize()