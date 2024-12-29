import { Client, Databases, ID, Query } from "appwrite";
import conf from "../Conf/conf";

export class RoomDb {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwrite_Url)
            .setProject(conf.appwrite_ProjectId);
        this.databases = new Databases(this.client);
    }


    async createRoom({ RoomName, RoomDescription, RoomKey, UserName }) {
        try {
            return await this.databases.createDocument(
                conf.appwrite_databaseId,
                conf.appwrite_collectionId,
                ID.unique(),
                {
                    RoomName,
                    RoomDescription,
                    RoomKey,
                    UserName
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createRoom :: error", error);
        }
    }


    async getRooms() {
        try {
            return await this.databases.listDocuments(
                conf.appwrite_databaseId,
                conf.appwrite_collectionId
            );
        } catch (error) {
            console.log("Appwrite service :: getRoom :: error", error);
            return false;
        }
    }
    async getRoomsByUserName({UserName}) {
        try {
            return await this.databases.listDocuments(
                conf.appwrite_databaseId,
                conf.appwrite_collectionId,
                [
                    Query.equal('UserName', `${UserName}`)
                ]
            );
        } catch (error) {
            console.log("Appwrite service :: getRoom :: error", error);
            return false;
        }
    }
    async getRoomsByName(RoomName) {
        try {

            const filters = RoomName
            ? [Query.contains('RoomName', RoomName),Query.orderDesc("$createdAt")]
            : [Query.orderDesc("$createdAt")];

            return await this.databases.listDocuments(
                conf.appwrite_databaseId,
                conf.appwrite_collectionId,
                filters
            );
        } catch (error) {
            console.log("Appwrite service :: getRoom :: error", error);
            return false;
        }
    }

    async getRoom({RoomId}) {
        try {
            return await this.databases.getDocument(
                conf.appwrite_databaseId,
                conf.appwrite_collectionId,
                RoomId
            );
        } catch (error) {
            console.log("Appwrite service :: getRoom :: error", error);
            return false;
        }
    }
}

const roomdb= new RoomDb();
export default roomdb;

