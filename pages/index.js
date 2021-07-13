import React from 'react';
import { Container } from '@chakra-ui/react';

import Layout from 'components/Layout';
import Slideshow from 'components/Slideshow';
import StructuredContent from 'components/StructuredContent';
import ModularContent from 'components/ModularContent';

import * as queries from 'lib/queries';
import { doQuery } from 'lib/api';
import { getLayoutData } from 'lib/utils';

const BlogIndexPage = ({ page, layout }) => {
  return (
    <Layout data={layout}>
      {page.slideshow?.slides && <Slideshow slides={page.slideshow.slides} />}
      <Container maxW={'container.xl'} px={4} py={5}>
        {/* <Heading as="h1" fontSize="6xl" py={10}>{page.title}</Heading> */}
        {page.content && <StructuredContent content={page.content} />}
        {page.modBlocks && <ModularContent content={page.modBlocks} />}
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const response = await doQuery(queries.home, null);
  const page = response?.data?.home;

  if (!page) {
    console.log('HOME QUERY', queries.home);
  }

  const siteResponse = await doQuery(queries.siteQuery, null);
  const layout = getLayoutData(siteResponse, page?.seo);

  return {
    props: { page, layout }
  };
}

export default BlogIndexPage;
