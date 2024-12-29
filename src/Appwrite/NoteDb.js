import { Client, Databases, ID, Query } from "appwrite";
import conf from "../Conf/conf";

export class NoteDb {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwrite_Url)
            .setProject(conf.appwrite_ProjectId);
        this.databases = new Databases(this.client);
    }


    async createNote({ title, description, room }) {
        try {
            return await this.databases.createDocument(
                conf.appwrite_databaseId,
                conf.appwrite_collectionId2,
                ID.unique(),
                {
                    title,
                    description,
                    room
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createRoom :: error", error);
        }
    }


    async getNotes(room) {
        try {
            return await this.databases.listDocuments(
                conf.appwrite_databaseId,
                conf.appwrite_collectionId2,
                [
                    Query.equal('room', `${room}`)
                ]
            );
        } catch (error) {
            console.log("Appwrite service :: getNotes :: error", error);
            return false;
        }
    }
}

const notedb= new NoteDb();
export default notedb;

