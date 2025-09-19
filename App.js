import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import { Amplify } from 'aws-amplify';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import { signUp, signIn, signOut, getCurrentUser, fetchUserAttributes, fetchAuthSession } from "@aws-amplify/auth";


import { EXPO_PUBLIC_USER_POOL_ID, EXPO_PUBLIC_USER_POOL_CLIENT_ID } from "@env";	
console.log({ EXPO_PUBLIC_USER_POOL_ID, EXPO_PUBLIC_USER_POOL_CLIENT_ID })

if (!EXPO_PUBLIC_USER_POOL_ID || !EXPO_PUBLIC_USER_POOL_CLIENT_ID) {
    console.warn('Amplify Auth env missing: check EXPO_PUBLIC_USER_POOL_ID and EXPO_PUBLIC_USER_POOL_CLIENT_ID');
}

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: EXPO_PUBLIC_USER_POOL_ID,
            userPoolClientId: EXPO_PUBLIC_USER_POOL_CLIENT_ID,
            ...(REGION ? { region: REGION } : {}),
            loginWith: {
                email: true
            },
            signUpVerificationMethod: 'link',
        },
    }
});


function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSignIn = async () => {
        setMessage('');
        setLoading(true);
        try {
            const user = await signIn({
                username: email.trim(),
                password,
                options: { authFlowType: 'USER_PASSWORD_AUTH' },
            });

            const current = await getCurrentUser();
            const attrs = await fetchUserAttributes();
            const session = await fetchAuthSession();

            setMessage(`Signed in as ${current.username}`);
            console.log('Attributes:', attrs);
            console.log('Session:', session);
        } catch (error) {
            console.error('Error signing in:', error);
            try {
                console.log('Error details =>', JSON.stringify({
                    name: error?.name,
                    message: error?.message,
                    cause: error?.cause,
                    code: error?.code,
                }));
            } catch {}
            setMessage(typeof error === 'string' ? error : (error?.message || 'Sign-in failed'));
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        setLoading(true);
        setMessage('');
        try {
            await signOut();
            setMessage('Signed out');
        } catch (error) {
            console.error('Error signing out:', error);
            setMessage('Sign-out failed');
        } finally {
            setLoading(false);
        }
    };

    const canSubmit = email.trim().length > 0 && password.length > 0 && !loading;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Amplify Login</Text>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
            {loading ? (
                <ActivityIndicator style={{ marginVertical: 8 }} />
            ) : (
                <View style={styles.row}>
                    <View style={styles.button}>
                        <Button title="Sign In" onPress={handleSignIn} disabled={!canSubmit} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Sign Out" color="#a00" onPress={handleSignOut} disabled={loading} />
                    </View>
                </View>
            )}
            {!!message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16,
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginVertical: 6,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 10,
    },
    button: {
        flex: 1,
        marginHorizontal: 4,
    },
    message: {
        marginTop: 12,
        color: '#333',
    },
});
