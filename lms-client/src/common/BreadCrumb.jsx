import { Breadcrumbs, Typography, Link as MuiLink } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const BreadCrumb = (props) => {
  const location = useLocation();

  // Split the current path into segments
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs sx={props.style} aria-label="breadcrumb">
      {/* Home Link */}
      <Link className="link" to="/">
        Home
      </Link>

      {/* Map through the pathnames to create dynamic breadcrumbs */}
      {pathnames.map((value, index) => {
        // Build the URL for each breadcrumb link
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        // If it's the last part, show it as text (current page), otherwise show a link
        return index === pathnames.length - 1 ? (
          <Typography color="text.primary" key={to}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Typography>
        ) : (
          <MuiLink component={Link} to={to} key={to} color="inherit" style={{ textDecoration: 'none' }}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </MuiLink>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
