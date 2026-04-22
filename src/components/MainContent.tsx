import {
  Breadcrumb,
  BreadcrumbItem,
  Grid,
  Column,
  ClickableTile,
} from '@carbon/react';

const tiles = [
  {
    id: 1,
    title: 'Getting Started',
    description: 'Learn the basics and set up your first project with our quick start guide.',
  },
  {
    id: 2,
    title: 'Components',
    description: 'Explore the full library of reusable UI components available in the system.',
  },
  {
    id: 3,
    title: 'Design Guidelines',
    description: 'Review design principles, color palettes, typography, and spacing tokens.',
  },
  {
    id: 4,
    title: 'API Reference',
    description: 'Detailed documentation for all available APIs and service endpoints.',
  },
  {
    id: 5,
    title: 'Tutorials',
    description: 'Step-by-step tutorials to help you build common patterns and workflows.',
  },
  {
    id: 6,
    title: 'Community',
    description: 'Connect with other developers, ask questions, and share your projects.',
  },
];

const MainContent = () => {
  return (
    <div className="content-section">
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <div className="page-header">
            <Breadcrumb noTrailingSlash aria-label="Page breadcrumb">
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>Overview</BreadcrumbItem>
            </Breadcrumb>
          </div>
        </Column>

        <Column lg={16} md={8} sm={4}>
          <h2>Welcome to TBC Platform</h2>
          <p>Select a tile below to get started with the platform resources.</p>
        </Column>

        {tiles.map((tile) => (
          <Column key={tile.id} lg={4} md={4} sm={4} className="tile-group">
            <ClickableTile
              href="#"
              className="tile-card"
              id={`tile-${tile.id}`}
            >
              <h4>{tile.title}</h4>
              <p>{tile.description}</p>
            </ClickableTile>
          </Column>
        ))}
      </Grid>
    </div>
  );
};

export default MainContent;
