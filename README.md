# react-hook-form with yup (ft. react-spring)

## react-hook-form (version 7)
7버젼으로 넘어오면서 더 이상 as로 material-ui의 TextField 컴포넌트를 연결할 수 없다.  
따라서 render을 이용하여 구현하였다.  
yupSchema는 useForm안에 적용할 수 있다.  
```javascript
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ resolver: yupResolver(SignupSchema) });
```

## yup
yup을 써보니 굉장히 편하고 직관적이다.  
test함수를 통해 직접 custom validation 작성 가능하다.  
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

## react-spring
react-spring으로 다양한 animation을 구현할 수 있다.  
기존의 animation과 차이점은, 스프링처럼 움직인다는 것. 즉, 모션이 자연스럽다.  
기본 default의 작성은 styled-component와 유사하기에 material-ui의 컴포넌트와 함께 사용하기 위해선  
```javascript
const AnimatedTextField = animated(TextField);
```
이런 식으로 작성해야 한다.  
적용할 animation은 useSpring으로 초기화한 후 컴포넌트의 style안에 작성하여 사용한다.
```javascript
const { x } = useSpring({
    to: { x: 1 },
    config: { duration: 600 },
});
```
```css
style={{ height: '65px',
    transform: x.to({
        range: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
        output: [0, -20, 20, -15, 15, -10, 10, -5, 0],
    })
    .to(x => `translate(${x}px, 0px)`),
}}
```

이런 식으로 작성해야 한다.  


## 발견한 문제
specialPattern을 정규식 /gi로 작성하면 validation error가 됐다 안됐다 하는 오류가 발생한다.  
console.log로 찍어봐서 확인해보니 true, false가 교차되어 출력된다.  
-> 이유를 전혀 모르갰다... /gi는 '해당된 것 전부'라는 의미로 쓰이지 않나..?  
