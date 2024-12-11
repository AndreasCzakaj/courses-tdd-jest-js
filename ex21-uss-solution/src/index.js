import { PersonOdataProviderNodeFetchImpl } from "./PersonOdataProviderNodeFetchImpl.js"
import { UserSelfService } from "./user-self-service.js"
import { SignUpController } from "./SignUpController.js"
import { runServer } from "./index-app.js"
import { LoginController } from "./LoginController.js"
import { UserDaoMongoImpl } from "./UserDaoMongoImpl.js"
import { MongoClient } from "mongodb"
import { MongoMemoryServer } from "mongodb-memory-server"

export const mongodb = await MongoMemoryServer.create()
process.env.MONGO_URI = mongodb.getUri()
export const config = createConfig()
export const server = await runServer(config)

function createConfig() {
  const mongoClient = new MongoClient(process.env.MONGO_URI)
  const userDao = new UserDaoMongoImpl(mongoClient)
  const personOdataProvider = new PersonOdataProviderNodeFetchImpl({
    baseUrl:
      "http://services.odata.org/TripPinRESTierService/(S(3mslpb2bc0k5ufk24olpghzx))/People",
  })
  const uss = new UserSelfService(userDao, personOdataProvider)
  const signUpController = new SignUpController(uss)
  const loginController = new LoginController(uss)

  const config = {
    port: process.env.PORT || 3000,
    signUpController,
    loginController,
  }

  console.log(config)
  return config
}