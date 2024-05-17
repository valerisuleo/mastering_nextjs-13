import {
    Body,
    Container,
    Html,
    Link,
    Preview,
    Text,
    Heading,
} from '@react-email/components';
import React from 'react';

const WelcomeTemplate = () => {
    return (
        <Html>
            <Preview>Welcome to Our Service</Preview>
            <Body style={styles.body}>
                <Container style={styles.container}>
                    <div style={styles.header}>
                        <Heading style={styles.headerText}>
                            Welcome to Our Service!
                        </Heading>
                    </div>
                    <div style={styles.main}>
                        <Text>Dear User,</Text>
                        <Text>
                            We are excited to have you on board. Our service
                            offers you the best experience to manage your tasks
                            efficiently and effectively.
                        </Text>
                        <Text>Click the link below to get started:</Text>
                        <Link
                            href="https://www.valerisuleo.it"
                            style={styles.link}
                        >
                            www.valerisuleo.it
                        </Link>
                        <Text>We look forward to your success!</Text>
                        <Text>Best Regards,</Text>
                        <Text>The Team</Text>
                    </div>
                    <div style={styles.footer}>
                        <Text>
                            If you have any questions, feel free to{' '}
                            <Link
                                href="https://www.valerisuleo.it/contact"
                                style={styles.link}
                            >
                                contact us
                            </Link>
                            .
                        </Text>
                    </div>
                </Container>
            </Body>
        </Html>
    );
};

const styles = {
    body: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f4',
        padding: '20px',
        color: '#333',
    },
    container: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto',
    },
    header: {
        backgroundColor: '#3498db',
        padding: '10px 20px',
        borderRadius: '8px 8px 0 0',
        color: '#ffffff',
    },
    headerText: {
        fontSize: '24px',
        margin: '0',
    },
    main: {
        padding: '20px',
    },
    footer: {
        marginTop: '20px',
        padding: '10px',
        borderTop: '1px solid #dddddd',
        fontSize: '12px',
        color: '#777',
    },
    link: {
        color: '#3498db',
        textDecoration: 'none',
    },
    linkHover: {
        textDecoration: 'underline',
    },
};

export default WelcomeTemplate;
