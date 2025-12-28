import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import './NewTab.css';
import styled from 'styled-components';

import Search from './../Search';
import BrowserThemeProvider from './../Theme';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #05030b 0%, #050816 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const LogoTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(45deg, #9b5cff, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(155, 92, 255, 0.5);
  text-align: center;
`;

const Tagline = styled.p`
  font-size: 1.2rem;
  margin: 10px 0 40px 0;
  opacity: 0.8;
  text-align: center;
`;

const SearchWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 40px;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 60px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ActionCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(155, 92, 255, 0.2);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 30px rgba(155, 92, 255, 0.3);
    background: rgba(155, 92, 255, 0.1);
  }
`;

const ActionIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const ActionLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;

const FooterText = styled.footer`
  font-size: 0.8rem;
  opacity: 0.6;
  text-align: center;
`;

class NewTab extends React.Component {
  componentDidMount() {
    document.title = 'Helixis';
  }

  render = () => {
    return (
      <BrowserThemeProvider>
        <CssBaseline />
        <PageWrapper>
          <LogoTitle>Helixis</LogoTitle>
          <Tagline>AI-powered browser workspace</Tagline>
          <SearchWrapper>
            <Search />
          </SearchWrapper>
          <QuickActions>
            <ActionCard href="https://mail.google.com">
              <ActionIcon>📧</ActionIcon>
              <ActionLabel>Gmail</ActionLabel>
            </ActionCard>
            <ActionCard href="https://calendar.google.com">
              <ActionIcon>📅</ActionIcon>
              <ActionLabel>Calendar</ActionLabel>
            </ActionCard>
            <ActionCard href="https://drive.google.com">
              <ActionIcon>☁️</ActionIcon>
              <ActionLabel>Drive</ActionLabel>
            </ActionCard>
            <ActionCard href="https://buildium.com">
              <ActionIcon>🏢</ActionIcon>
              <ActionLabel>Buildium</ActionLabel>
            </ActionCard>
            <ActionCard href="#">
              <ActionIcon>⚙️</ActionIcon>
              <ActionLabel>Custom</ActionLabel>
            </ActionCard>
          </QuickActions>
          <FooterText>Helixis • Agentic browser copilot</FooterText>
        </PageWrapper>
      </BrowserThemeProvider>
    );
  };
}

export default NewTab;
