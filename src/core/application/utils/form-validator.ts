export default class FormValidator {

    static isEmailValid (email: string): boolean {
        const emailRegex = /^\S+@\S+\.\w{2,3}$/;
        return emailRegex.test(email);
    }

    static isPhoneValid (phone: string): boolean {
        const phoneRegex = /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g;
        return phoneRegex.test(phone);
    }

}