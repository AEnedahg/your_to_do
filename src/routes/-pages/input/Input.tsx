import { type ReactNode, useState, useRef} from "react";

import { PlusIcon, X } from "lucide-react";

import "./Input.css";

import '../../../styles/base.css';

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, useFieldArray } from "react-hook-form";

import gsap from "gsap";

import { useGSAP } from "@gsap/react";

const FormSchemaZod = z.object({
    todo: z.array(
        z.object({
            text: z
                .string()
                .nonempty('It must not be empty')
                .min(2, "It must be a minimum of 2 characters")
                .max(30, "It must be a maximum of 30 characters")
                .regex(/^[a-zA-Z ]+$/, "Only letters and spaces are allowed"),
            checked: z.boolean(),
        }),
    ),
    todoItem : z
                .string()
                .nonempty('It must not be empty')
                .min(2, "It must be a minimum of 2 characters")
                .max(30, "It must be a maximum of 30 characters")
                .regex(/^[a-zA-Z ]+$/, "Only letters and spaces are allowed"),
});

type FormSchema = z.infer<typeof FormSchemaZod>;

gsap.registerPlugin(useGSAP);

export default function Input(): ReactNode {

    const formRef = useRef(null);

    useGSAP(() => {
        gsap.from(formRef.current, {
            yPercent: 100,
            duration: 0.05,
            ease: 'power1.out',
            delay: 0.2,
            opacity: 0
        });
    });


    let [todoItem, setTodoItem] = useState<string>('');
    
    const form = useForm<FormSchema>({
        defaultValues: {
            todo : [],
            todoItem : ''
        },
        resolver: zodResolver(FormSchemaZod),
        mode: 'onChange'
    });

    const { control, handleSubmit, watch, register, formState, trigger, resetField } = form;

    const { errors } = formState;

    const { fields, append, remove } = useFieldArray({
        name : 'todo',
        control
    })

    function onSubmit ( data : FormSchema ) {
        console.log( data );
    }

    const todos = watch('todo');

    todoItem = watch('todoItem');

    const unCheckedCount = todos.filter((item) => {
        return item.checked == false;
    }).length;

    
    function performWatchCheck (index : number) : any {
        return watch(`todo.${index}.checked`);
    }


    return (
        <section>
            <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Add new task"
                        {...register('todoItem')}
                    />
                    <button
                        type="submit"
                        className="btn"
                        disabled={errors.todoItem?.message ? true : false}
                        onClick={() => {
                            const valid = trigger('todoItem');

                            if (!valid) return;

                            append({ text: todoItem, checked : false });
                            
                            resetField('todoItem');
                        }}
                    >
                        <PlusIcon color="white" />
                    </button>
                </div>
                <small>{errors.todoItem?.message}</small>
            </form>
            {fields.map((item, index) => {
                if (item.text.length == 0) {
                    return;
                }
                return (
                    <div className="item-wrapper" key={ index }>
                        <div>
                            <input type="checkbox" id='item' {...register(`todo.${index}.checked`)} />
                            <label htmlFor="item" className={performWatchCheck(index) ? 'checked' : ''}>{todos[index].text}</label>
                        </div>
                        <X color="#333333" onClick={() => remove(index)}/>
                    </div>
                );
            })}
            {
                todos.length > 0 ? (
                    <i className='remaining-todos'>Your remaining todos :&nbsp;
                        <span>
                            { unCheckedCount }
                        </span>
                    </i>
                ) : (<div></div>)
            }
            {
                todos.length > 0 ? (
                    <i>"Doing what you love is the cornerstone of having abundance in your life." - Wayne Dyer</i>
                ) : (<div></div>)
            }
        </section>
    );
}
