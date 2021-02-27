<template>
    <div class="card m-3">
        <h5 class="card-header">Worker-news-parser</h5>
        <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
                <div class="form-row">
                    <div class="form-group col">
                        <label>Выберите сайт</label>
                        <Field name="title" as="select" class="form-control" :class="{ 'is-invalid': errors.title }">
                            <option v-for="site in sites" :key="site.id">
                                <div>{{site.name}}</div>
                            </option>
                        </Field>
                        <div class="invalid-feedback">{{errors.title}}</div>
                    </div>
                     <div class="form-group col">
                        <label>Выберите или введите ключевые слова</label>
                        <Field name="title" as="select" class="form-control" :class="{ 'is-invalid': errors.title }">
                            <option v-for="key_word in key_words" :key="key_word.id">
                                <div>{{key_word.name}}</div>
                            </option>
                        </Field>
                        <div class="invalid-feedback">{{errors.title}}</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col">
                        <label>Найти с даты:</label>
                        <Field name="dob" type="date" class="form-control" :class="{ 'is-invalid': errors.dob }" />
                        <div class="invalid-feedback">{{errors.dob}}</div>
                    </div>
                     <div class="form-group col">
                        <label>Найти по дату:</label>
                        <Field name="dob" type="date" class="form-control" :class="{ 'is-invalid': errors.dob }" />
                        <div class="invalid-feedback">{{errors.dob}}</div>
                    </div>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary mr-1">Найти</button>
                </div>
            </Form>
        </div>
    </div>    
</template>

<script>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

export default {
    components: {
        Form,
        Field,
    },
    data() {
        return {
          sites: [
            {
                id: 1,
                name: "site 1",
            },
            {
              id: 2,
              name: "site 2",  
            }
        ],
            key_words: [
                {
                    id: 1,
                    name: "Забастовка",
                },
                {
                    id: 2,
                    name: "Увольнение",  
                }
            ],
        }
    },
    setup() {
        const schema = Yup.object().shape({
            title: Yup.string()
                .required('Поле обязательно'),
            dob: Yup.string()
                .required('Дата обязательна')
                .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
        });

        const onSubmit = values => {
            // display form values on success
            alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
        }

        return {
            schema,
            onSubmit
        };
    }
}
</script>
