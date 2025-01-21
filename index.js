const express = require("express");
const server = express();
const bodyParser = require("body-parser");
server.use(bodyParser.json());
const testRoude=require("./routes/test");
server.use("/test",testRoude);
const userList = [

];

// server.get("/users", (req, res, next) => {
//     res.status(200).json({
//         message: "User fetched successful",
//         users: userList
//     })
// });

server.post("/users/userList", (req, res, next) => {
    const { name } = req.body || {};

    const users = name
        ? userList.filter((u) => u.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
        : userList;

    if (users.length > 0) {
        res.status(200).json({
            message: name ? "User fetched successfully" : "All users retrieved",
            user: users,
        });
    } else {
        res.status(404).json({
            message: name ? "User not found" : "No users found",
            user: [],
        });
    }
});

server.post("/users/id", (req, res, next) => {
    const { id } = req.body;
    const user = userList.find((u) => u.id == id);
    if (user) {
        res.status(200).json({
            message: "User fetched successfully",
            user: user
        });
    }
    else {
        res.json({
            message: "User not found",
            user: []
        });
    }
});

server.post("/users/add", (req, res, next) => {
    const { name, id } = req.body;


    if (!name || !id) {
        return res.status(400).json({
            message: "Name and ID are required",
        });
    }


    const existingUser = userList.find(
        (u) => u.id === id || u.name.toLowerCase() === name.toLowerCase()
    );

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists",
        });
    }


    userList.push({ id, name });


    res.status(200).json({
        message: `${name} added successfully`,

    });
});

server.post("/users/update", (req, res, next) => {
    const { name, id } = req.body;

    if (!name || !id) {
        return res.status(400).json({
            message: "Name and ID are required",
        });
    }

    const index = userList.findIndex((u) => u.id === id);
    if (index === -1) {
        return res.status(404).json({
            message: "User not found.",
        });
    }

    const existingUser = userList.find((u) => u.name.toLowerCase() === name.toLowerCase());
    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        }
        );
    }

    userList[index].name = name;
    return res.status(200).json({
        message: "User updated successfully.",
    });
});

server.post("/users/delete", (req, res, next) => {
    const { id } = req.body;
    const index = userList.findIndex((u) => u.id === id);
    if (index === -1) {
        return res.status(404).json({
            message: "User not found.",
        });
    }

    const deletedUser = userList.splice(index, 1)[0];
    if (deletedUser) {
        return res.status(200).json({
            message: `${deletedUser.name} deleted successfully.`,
        });
    }
});
// server.get("/users/id/:id", (req, res, next) => {
//     const id = req.params.id;
//     const user = userList.find((u) => u.id == id);
//     if (user) {
//         res.status(200).json({
//             message: "User fetched successfully",
//             user: user
//         });
//     }
//     else {
//         res.json({
//             message: "User not found"
//         })
//     }
// });

// server.get("/users/name/:name", (req, res, next) => {
//     const name = req.params.name.toLocaleLowerCase();
//     const user = userList.filter((u) => u.name.toLocaleLowerCase().includes(name));
//     if (user.length > 0) {
//         res.status(200).json({
//             message: "User fetched successfully",
//             user: user
//         });
//     }
//     else {
//         res.json({
//             message: "User not found",
//             user: []
//         })
//     }
// })

server.get("*", (req, res, next) => {
    res.json({
        msg: "No route found!"
    });
});

server.listen(3000, () => {
    console.log("Server is running on port 3000");
})