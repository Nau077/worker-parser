<template>
    <div class="card m-3">
        <h5 class="p-4 bg-red-600 text-left font-bold text-2xl text-white">Worker Parser</h5>
        <div class="p-4">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
                <div class="grid-cols-2 grid gap-8">
                    <div class="flex flex-col">
                        <label>Выберите сайт</label>
                        <Field name="sites" as="select" class="p-2 border rounded-2xl" :class="{ 'is-invalid': errors.title }">
                            <option class="" v-for="site in sites" :key="site.id">
                                {{site.name}}
                            </option>
                        </Field>
                        <div class="invalid-feedback">{{errors.title}}</div>
                    </div>
                     <div class="mb-4">
                        <label>Выберите или введите ключевые слова</label>
                        <Field name="key_words" as="select" class="form-control" :class="{ 'is-invalid': errors.title }">
                            <option v-for="key_word in key_words" :key="key_word.id">
                                <div>{{key_word.name}}</div>
                            </option>
                        </Field>
                        <div class="invalid-feedback">{{errors.title}}</div>
                    </div>
                </div>
                <div class="grid-cols-2 grid gap-8 mb-4">
                    <div>
                        <label>Найти с даты:</label>
                        <Field name="dob" type="date" class="form-control" :class="{ 'is-invalid': errors.dob }" />
                        <div class="invalid-feedback">{{errors.dob}}</div>
                    </div>
                     <div>
                        <label>Найти по дату:</label>
                        <Field name="dab" type="date" class="form-control" :class="{ 'is-invalid': errors.dob }"/>
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
import { ref } from "vue";

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

    async mounted() {
        // await this.fetchSites()
        await this.$store.dispatch('fetchSites')
        console.log(this.$store.state)
    },

    // methods: {
    //    ...mapActions(["fetchSites"]),
    // },
    setup() {
        const endDate = ref(new Date());
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
            endDate,
            schema,
            onSubmit
        };
    }
}
</script>
<style>
.form-control.is-invalid {
    background-position: right calc(.375em + 2.1875rem) center;
    padding-right: calc(1.5em + -1.25rem)
}


</style>