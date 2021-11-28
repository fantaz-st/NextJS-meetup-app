import Head from 'next/head';

import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>NextJS Meetups by CB</title>
        <meta name="description" content="A list of meetups made with NextJS"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  //fetch data from an API
  const client = await MongoClient.connect(`mongodb+srv://cbabic:over9000@cluster0.jbswg.mongodb.net/meetups?retryWrites=true&w=majority`);

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      // meetups:meetups,
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

/* export const getServerSideProps = async (context) => {
  const req = context.req;
  const res = context.res;
  return {
    props: {
      meetups: DUMMYS,
    },
  };
}; */

export default HomePage;
