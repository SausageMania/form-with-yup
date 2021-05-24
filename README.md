# react-hook-form with yup

## react-hook-form (version 7)
7버젼으로 넘어오면서 더 이상 as로 material-ui의 TextField 컴포넌트를 연결할 수 없음.  
따라서 render을 이용하여 구현하였음.  
yupSchema는 useForm안에 적용할 수 있음.  
```javascript
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ resolver: yupResolver(SignupSchema) });
```

## yup
yup을 써보니 굉장히 편하고 직관적임.  
test함수를 통해 직접 custom validation 작성 가능.  
```javascript
const specialPattern = /[`~!@#$%^&*|'";:/={}?<>,.-]/;

const SignupSchema = yup.object().shape({
    userId: yup
        .string()
        .required('아이디를 입력해주세요.')
        .test('test-special-pattern', '특수문자!', async value => {
            await console.log(!specialPattern.test(value) + ' / ' + value);
            return await !specialPattern.test(value);
        }),
});
```
