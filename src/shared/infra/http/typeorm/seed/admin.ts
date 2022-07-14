import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

async function create() {
    const connection = await createConnection("localhost");

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO "users"("id_user", "name", "email", "password", "is_admin", "created_at", "is_vip")
            values ('${id}', 'admin', 'admin@qfinances.com.br', '${password}', 'true', 'now()', 'false')
        `
    );

    await connection.close();
}

create().then(() => console.log("User admin created!"));
