import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSpring, animated } from 'react-spring';

const specialPattern = /[~!@#$%^&*()_+|<>?:;{}'"/,.]/;

const SignupSchema = yup.object().shape({
    userId: yup
        .string()
        .trim()
        .required('아이디를 입력해주세요.')
        .test('invalid special pattern', '특수문자는 입력하실 수 없습니다.', value => {
            return !specialPattern.test(value);
        }),
});

const App = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm({ resolver: yupResolver(SignupSchema) });

    const [userId, setUserId] = useState('');

    const { x } = useSpring({
        to: { x: 1 },
        config: { duration: 600 },
    });

    const AnimatedTextField = animated(TextField);
    const AnimatedBox = animated(Box);

    const onSubmit = data => {
        setUserId(data.userId);
    };

    const onError = errors => {
        x.set(0);
        setUserId(errors.userId.type);
        setValue('userId', '');
    };

    return (
        <Box
            width="500px"
            height="400px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            component={Paper}
            elevation={13}
        >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
                width="100%"
                flexDirection="column"
                position="relative"
            >
                <Box position="absolute" top={10}>
                    <Typography style={{ fontWeight: 600, fontSize: '24px' }}>
                        react-hook-form with yup
                        <br />
                        (ft. react-spring)
                    </Typography>
                </Box>
                <Box border="1px solid black" p={3} mb={2}>
                    <form onSubmit={handleSubmit(onSubmit, onError)}>
                        <Box>
                            <Controller
                                name="userId"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <AnimatedTextField
                                        variant="outlined"
                                        size="small"
                                        label="유저 아이디"
                                        helperText={errors.userId?.message}
                                        error={errors.userId ? true : false}
                                        {...field}
                                        style={{
                                            height: '65px',
                                            transform: x
                                                .to({
                                                    range: [
                                                        0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75,
                                                        0.875, 1,
                                                    ],
                                                    output: [0, -20, 20, -15, 15, -10, 10, -5, 0],
                                                })
                                                .to(x => `translate(${x}px, 0px)`),
                                        }}
                                    />
                                )}
                            />
                        </Box>
                        <Box mb={2} display="flex" justifyContent="flex-end">
                            <Button variant="outlined" type="submit">
                                제출
                            </Button>
                        </Box>
                        <Box display="flex">결과 : {userId}</Box>
                    </form>
                </Box>
                <AnimatedBox
                    style={{
                        transform: x
                            .to({
                                range: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
                                output: [0, -20, 20, -15, 15, -10, 10, -5, 0],
                            })
                            .to(x => `translate(${x}px, 0px)`),
                    }}
                >
                    {x.get() === 0 ? '이렇게요.' : '에러가 나면 animation이 동작합니다.'}
                </AnimatedBox>
            </Box>
        </Box>
    );
};
export default App;
