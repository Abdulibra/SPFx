import * as React from 'react';
import styles from './MgtDemo.module.scss';
import { IMgtDemoProps } from './IMgtDemoProps';
import { Person, TeamsChannelPicker } from '@microsoft/mgt-react/dist/es6/spfx';
import { MgtTeamsChannelPicker, ViewType } from '@microsoft/mgt-spfx';

const MgtDemo: React.FC<IMgtDemoProps> = (props) => {
  const {
    // description,
    isDarkTheme,
    environmentMessage,
    hasTeamsContext,
  } = props;

  return (
    <section className={`${styles.mgtDemo} ${hasTeamsContext ? styles.teams : ''}`}>
      <div className={styles.welcome}>
        <h2>Microsoft Graph Toolkit Demo!</h2>
        <img alt="" src={isDarkTheme ? require('../assets/MGT-Logo.png') : require('../assets/MGT-Logo.png')} className={styles.welcomeImage} />
        <div>{environmentMessage}</div>
      </div>
      <div>
        <Person personQuery='me' view={ViewType.threelines} />
        <TeamsChannelPicker templateContext={MgtTeamsChannelPicker} />

      </div>
    </section>
  );
}

export default MgtDemo;