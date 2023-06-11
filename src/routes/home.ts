import { app } from "../lib/socketProvider";

export const registerHome = () => {
	app.get("/home", (req, res) => {
		res.send("beuh");
	});
};
