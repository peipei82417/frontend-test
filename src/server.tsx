import { createServer } from "miragejs";

createServer({
    routes() {
        this.namespace = "api";
        this.get("/properties", () => {
            const data: Common.Property[] = [
                {
                    id: 1,
                    state: "Georgia",
                    city: "Attleboro",
                    type: "Apartment",
                    price: 218,
                },
                {
                    id: 2,
                    state: "Wyoming",
                    city: "Enterprise",
                    type: "Townhomes",
                    price: 696,
                },
                {
                    id: 3,
                    state: "Montana",
                    city: "South Hill",
                    type: "Condo",
                    price: 1190,
                },
            ];
            return {
                data,
            };
        });
    },
});
