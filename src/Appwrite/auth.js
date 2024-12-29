import { Client, Account, ID, AppwriteException } from "appwrite";
import md5 from "md5"; // Install this package
import conf from "../Conf/conf";

export class Auth {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwrite_Url)
            .setProject(conf.appwrite_ProjectId);
        this.account = new Account(this.client);
    }

    async Register({ email, password, username }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, username);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Register error", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Login error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Error fetching current user:", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Logout error", error);
        }
    }

    // Send verification email
    async sendVerificationEmail() {
        try {
            const result = await this.account.createVerification("http://localhost:5173/Verify");
            console.log("Verification email sent:", result);
            return result;
        } catch (error) {
            console.error("Error sending verification email:", error);
            throw error;
        }
    }

    // Confirm email verification
    async confirmVerification(userId, secret) {
        try {
            const result = await this.account.updateVerification(userId, secret);
            console.log("Email verified successfully:", result);
            return result;
        } catch (error) {
            console.error("Error confirming verification:", error);
            throw error;
        }
    }

    // Generate Gravatar URL for the user's email
    async getAvatar(email) {
        if (!email) {
            return null;
        }
        const hash = md5(email.trim().toLowerCase());
        const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?d=identicon`;
        return gravatarUrl;
    }
}

const auth = new Auth();
export default auth;
