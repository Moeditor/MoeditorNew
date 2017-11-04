import React from 'react';
import Radium from 'radium';

import Button from '../components/Button.jsx';
import Icon from '../components/Icon.jsx';
import Link from '../components/Link.jsx';
import Image from '../components/Image.jsx';

import Panel from './Panel.jsx';

export default Radium(class AboutPanel extends React.Component {
  render () {
    let linkStyle = {
      textDecoration: 'none',
      color: this.props.theme.about.link['color'],
      textShadow: this.props.theme.about.link['text-shadow']
    };
    return (
      <Panel theme={this.props.theme} appConfig={this.props.appConfig}>
        <div className='m-about'
             style={{
                     textAlign: 'center',
                     WebkitUserSelect: 'none',
                     cursor: 'default',
                     width: '100%',
                     position: 'relative',
                     top: this.props.theme.about['top'],
                     transform: 'translateY(-50%)'
                   }}>
          {/* The (big) icon */}
          <div className='m-about-icon'>
            <Image className='m-about-icon-img'
                   style={{
                           width: this.props.theme.about.icon['size'],
                           height: this.props.theme.about.icon['size']
                         }}
                   src={app.getAssetURL('icon.svg')} />
          </div>
          {/* Texts after icon */}
          <div className='m-about-text-appname'
               style={{
                       fontFamily: 'Raleway Thin',
                       fontSize: this.props.theme.about.appName['font-size'],
                       textShadow: this.props.theme.about.appName['text-shadow'],
                       margin: this.props.theme.about.appName['margin'],
                       color: this.props.theme.about.appName['color'],
                       letterSpacing: this.props.theme.about.appName['letter-spacing']
                     }}>
            MOEDITOR
          </div>
          <div className='m-about-text-description'
               style={{
                       fontFamily: 'Raleway Regular',
                       textAlign: 'center',
                       fontSize: this.props.theme.about.description['font-size'],
                       textShadow: this.props.theme.about.description['text-shadow'],
                       margin: this.props.theme.about.description['margin'],
                       color: this.props.theme.about.description['color'],
                       letterSpacing: this.props.theme.about.description['letter-spacing']
                     }}>
            {app.metaInfo.getDescription()}
          </div>
          {/* Buttons */}
          <div className='m-about-buttons'
               style={{
                       margin: this.props.theme.about.buttons['margin']
                     }}>
            <Button size='medium'
                    theme={this.props.theme} appConfig={this.props.appConfig}
                    icon={this.props.theme.icon.menuView.about['github']}
                    href={app.metaInfo.getLink('github')}>
              GitHub
            </Button>
            <Button size='medium'
                    theme={this.props.theme} appConfig={this.props.appConfig}
                    icon={this.props.theme.icon.menuView.about['issue']}
                    href={app.metaInfo.getLink('issues')}>
              Issues
            </Button>
            <Button size='medium'
                    theme={this.props.theme} appConfig={this.props.appConfig}
                    icon={this.props.theme.icon.menuView.about['website']}
                    href={app.metaInfo.getLink('website')}>
              Website
            </Button>
            <Button size='medium'
                    theme={this.props.theme} appConfig={this.props.appConfig}
                    icon={this.props.theme.icon.menuView.about['twitter']}
                    href={app.metaInfo.getLink('twitter')}>
              Twitter
            </Button>
          </div>
          {/* Author and version */}
          <div className='m-about-text-author'
               style={{
                       fontFamily: 'Raleway Regular',
                       fontSize: this.props.theme.about.author['font-size'],
                       letterSpacing: this.props.theme.about.author['letter-spacing'],
                       color: this.props.theme.about.author['color'],
                       textShadow: this.props.theme.about.author['text-shadow'],
                       margin: this.props.theme.about.author['margin']
                     }}>
            <Icon name='code' wrapped size={this.props.theme.about.author['icon-size']} />
            {' with '}
            <Icon name='heart' wrapped size={this.props.theme.about.author['icon-size']} />
            {' by '}
            <Link style={linkStyle} href='https://men.ci'>Menci</Link>
            {' and '}
            <Link style={linkStyle} href={app.metaInfo.getLink('contributors')}>other contributors</Link>
          </div>
          <div className='m-about-text-version'
               style={{
                       fontFamily: 'Raleway Regular',
                       fontSize: this.props.theme.about.version['font-size'],
                       letterSpacing: this.props.theme.about.version['letter-spacing'],
                       textShadow: this.props.theme.about.version['text-shadow'],
                       color: this.props.theme.about.version['color'],
                       margin: this.props.theme.about.version['margin']
                     }}>
            {app.metaInfo.getVersionText()}
          </div>
        </div>
      </Panel>
    );
  }
});
