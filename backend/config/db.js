import mongoose from "mongoose";

const DB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log(`Database Connected the port : ${process.env.PORT} & host name is : ${mongoose.connection.host}`)
    );
    await mongoose.connect(`${process.env.MONGOOSE_URI}/MERN_AUTHENTICATION`);
  } catch (err) {
    return console.log("Not Connected the Database Pelase try again");
  }
};
export { DB };
