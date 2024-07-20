/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Navigation from './Navigation';

interface PageLayoutProps {
  children: React.ReactNode;
}
export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div css={pageLayoutStyles}>
      <Navigation />
      <div css={contentStyles}>{children}</div>
    </div>
  );
}

const pageLayoutStyles = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const contentStyles = css`
  flex: 1;
  padding: 20px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  @media (min-width: 1024px) {
    /* 데스크탑 */
    max-width: 1000px;
    padding: 40px;
    padding-bottom: 80px;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    /* 패드 */
    max-width: 800px;
    padding: 30px;
    padding-bottom: 60px;
  }

  @media (max-width: 767px) {
    /* 모바일 */
    max-width: 100%;
    padding: 20px;
    padding-bottom: 40px;
  }
`;

// import { css } from '@emotion/react';

// interface PageLayoutProps {
//   children: React.ReactNode;
// }
// export function PageLayout({ children }: PageLayoutProps) {
//   return <div css={pageLayoutStyles}>{children}</div>;
// }

// const pageLayoutStyles = css`
//   width: 100%;
//   min-height: 100vh;
//   padding: 0px 20px;
//   box-sizing: border-box;
// `;
