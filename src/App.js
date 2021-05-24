import React, { useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const specialPattern = /[~!@#$%^&*()_+|<>?:;{}'"/,.]/;

const SignupSchema = yup.object().shape({
    userId: yup
        .string()
        .required('아이디를 입력해주세요.')
        .test('test-special-pattern', '특수문자!', async value => {
            await console.log(!specialPattern.test(value) + ' / ' + value);
            return await !specialPattern.test(value);
        }),
});

const App = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ resolver: yupResolver(SignupSchema) });

    const [userId, setUserId] = useState('');

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <form onSubmit={handleSubmit(data => setUserId(data.userId))}>
                <Box>
                    <Controller
                        name="userId"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                variant="outlined"
                                size="small"
                                label="유저 아이디"
                                helperText={errors.userId ? errors.userId.message : ' '}
                                error={errors.userId ? true : false}
                                {...field}
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
    );
};
export default App;
