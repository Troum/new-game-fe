import {extend, localize} from 'vee-validate';
import {email, required, image} from "vee-validate/dist/rules";
import ru from 'vee-validate/dist/locale/ru';

extend('required', required);
extend('email', email);
extend('image', image);


localize('ru', ru);
