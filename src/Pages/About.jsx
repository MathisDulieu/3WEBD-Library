import React from 'react'

function About () {
    return (
        <div className='max-w-4xl mx-auto py-8'>
            <h1 className='text-3xl font-bold mb-4'>About Our App</h1>
            <div className='text-justify'>
                <p className='mb-4'>
                    <strong>Welcome to the Lille Library App</strong>, your ultimate destination for
                    exploring and discovering books of all genres!
                </p>
                <p className='mb-4'>
                    At Library App, our mission is to provide book enthusiasts with a
                    seamless platform to access a vast collection of books from around the
                    world. Whether you're searching for classic literature, contemporary
                    fiction, academic texts, or even obscure titles, Library App has got
                    you covered.
                </p>
                <p className='mb-4'>
                    Our app harnesses the power of the Open Library API, allowing users to
                    search for books by title, author, publication year, and more. With
                    our intuitive search interface, finding your next favorite read has
                    never been easier.
                </p>
                <p className='mb-4'>
                    Explore curated lists, discover popular titles, and even contribute to
                    the ever-expanding catalog by adding your own reviews and ratings.
                </p>
                <p className='mb-4'>
                    Whether you're a casual reader, a seasoned bibliophile, or a student
                    conducting research, Library App is your go-to resource for all things
                    books. Join our community today and embark on a journey of literary
                    exploration!
                </p>
            </div>
        </div>
    )
}

export default About