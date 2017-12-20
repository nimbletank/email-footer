import {Component} from 'react'
import MasterLayout from '../layouts/master'
import styled from 'react-emotion'
import FormRow from '../components/FormRow'
import { Highlight } from 'react-fast-highlight'
import CopyToClipboard from 'react-copy-to-clipboard'

const SiteContainer = styled('div')`
  font-size
  text-align: left;
  max-width: 100%;
  margin: 0 auto;

  .html-viewer {
    background-color: #fff;
    padding: 20px;
  }

  .html-code {
    max-height: 500px;
    overflow-y: auto;
  }

  pre {
    margin: 0;
  }

  .message-copied {
    font-size: 12px;
    color: #f39c12;
  }

  input {
    color: #333;
  }

  button {
    position: relative;
    vertical-align: top;
    width: 100%;
    height: 60px;
    padding: 0;
    font-size: 22px;
    color: white;
    text-align: center;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    background: #f39c12;
    border: 0;
    border-bottom: 2px solid #e8930c;
    cursor: pointer;
    -webkit-box-shadow: inset 0 -2px #e8930c;
    box-shadow: inset 0 -2px #e8930c;
  }

  button:active {
    top: 1px;
    outline: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .hljs {
    display: block;
    overflow-x: auto;
    padding: 20px;
    background: #2b2b2b;
    color: #bababa;
  }

  .hljs-strong,
  .hljs-emphasis {
    color: #a8a8a2;
  }

  .hljs-bullet,
  .hljs-quote,
  .hljs-link,
  .hljs-number,
  .hljs-regexp,
  .hljs-literal {
    color: #6896ba;
  }

  .hljs-code,
  .hljs-selector-class {
    color: #a6e22e;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-section,
  .hljs-attribute,
  .hljs-name,
  .hljs-variable {
    color: #cb7832;
  }

  .hljs-params {
    color: #b9b9b9;
  }

  .hljs-string {
    color: #6a8759;
  }

  .hljs-subst,
  .hljs-type,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-symbol,
  .hljs-selector-id,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-template-tag,
  .hljs-template-variable,
  .hljs-addition {

    color: #e0c46c;
  }

  .hljs-comment,
  .hljs-deletion,
  .hljs-meta {
    color: #7f7f7f;
  }

  .container {
    display: box;

    @media (min-width: 620px) {
      display: flex;
      overflow: hidden;
    }
 }

  .container .col {
    display: table-footer-group;

    @media (min-width: 620px) {
      flex: 1;
      width: 50%;
    }
  }

  .container .col:nth-child(1) {
    background: #2b2b2b;
    order: 1;
  }

  .container .col:nth-child(2) {
    background: #ffffff;
    order: 0;
  }
`

class Index extends Component {

    constructor(props) {
        super(props);

        this.onSelectDepartment = this.onSelectDepartment.bind(this);
        this.onInputName = this.onInputName.bind(this);
        this.onInputTitle = this.onInputTitle.bind(this);
        this.onInputMobile = this.onInputMobile.bind(this);
        this.onCopy = this.onCopy.bind(this);

        this.state = {
            nameValue: 'Zak Zubair',
            titleValue: 'Full Stack Developer',
            mobileValue: '07450438466',
            departmentValue: 'client', // Set default option to Client Services
            copied: false
        };

        //Drop-down option
        this.departmentList = [
            {value: 'client', label: 'Client Service'},
            {value: 'management', label: 'Management'},
            {value: 'product', label: 'Product'},
            {value: 'creative', label: 'Creative'},
            {value: 'tech', label: 'Tech'}]

        this.nameLabel = 'Name'
        this.namePlaceholder = 'Enter the name...'
        this.titleLabel = 'Title'
        this.titlePlaceholder = 'Enter the title...'
        this.mobileLabel = 'Mobile'
        this.mobilePlaceholder = 'Enter the mobile...'
        this.departmentLabel = 'Department'
        this.buttonLabel = 'Click here to copy the HTML code'
        this.htmlCopiedLabel = 'HTML code copied'

        //Email themes
        this.theme = [
            {value: 'client', colorCode: 'ff9500', color: 'orange'},
            {value: 'management', colorCode: 'ff7200', color: 'orange-dark'},
            {value: 'product', colorCode: 'e82219', color: 'red'},
            {value: 'creative', colorCode: 'c4d000', color: 'green'},
            {value: 'tech', colorCode: '1aa5c8', color: 'blue'}
        ]

    }

    componentDidMount () {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/static/service-worker.js')
          .then(registration => {
            console.log('service worker registration successful')
          })
          .catch(err => {
            console.warn('service worker registration failed', err.message)
          })
      }
    }

    onSelectDepartment(val) {
        this.setState({
            departmentValue: val.value,
            copied: false

        });
    }

    onInputName(name) {
        this.setState({
            nameValue: name.target.value,
            copied: false
        });
    }

    onInputTitle(title) {
        this.setState({
            titleValue: title.target.value,
            copied: false
        });
    }

    onInputMobile(mobile) {
        this.setState({
            mobileValue: mobile.target.value,
            copied: false
        });
    }

    onCopy() {
        this.setState({
            copied: true
        });
    }

    render() {

        const theme = this.theme
            .filter((department) => {
                return department.value === this.state.departmentValue;
            })
            .map((department) => {
                return {
                    colorCode: department.colorCode,
                    color: department.color
                };
            });

        const template = `<table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt" width="100%">
    <tr>
        <td width="100%" style="width:100%;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%;">
                <tr>
                    <td width="100%">
                        <font face="Helvetica, Arial, sans-serif" size="2" color="53585f" style="font-size:25px"><strong>${this.state.nameValue}</strong><br></font>
                        <font face="Helvetica, Arial, sans-serif" size="2" color="${theme[0].colorCode}" style="font-size:13px">${this.state.titleValue}</font>

                            <div style="margin-top: 15px;"></div>

                            <a href="https://www.nimbletank.com" target="_blank"><img src="https://www.nimbletank.com/static/email-signatures/images/nt-logo-${theme[0].color}.png" width="68" height="68" alt="Nimbletank" border="0" style="display:block" />

                            <div style="margin-top: 15px;"></div>

                        </a>

                        <font face="Helvetica, Arial, sans-serif" size="2" color="${theme[0].colorCode}" style="font-size:13px"><strong>t.</strong></font> <font face="Helvetica, Arial, sans-serif" size="2" color="53585f" style="font-size:13px">0203 8286440</font> &nbsp;
                        <font face="Helvetica, Arial, sans-serif" size="2" color="${theme[0].colorCode}" style="font-size:13px"><strong>m.</strong></font> <font face="Helvetica, Arial, sans-serif" size="2" color="53585f" style="font-size:13px">${this.state.mobileValue}<br></font>
                        <div style="margin-top: 15px; margin-bottom: 15px;">
                            <img src="https://www.nimbletank.com/static/email-signatures/images/div-${theme[0].color}.png">
                        </div>


                        <font face="Helvetica, Arial, sans-serif" size="2" color="53585f" style="font-size:13px"><b>Nimbletank</b></strong></font><font face="Helvetica, Arial, sans-serif" size="2" color="53585f" style="font-size:13px"> Sweeps Building, 6-7 St Cross St, London, EC1N 8UA<br></font>
                        <a href="https://www.nimbletank.com" target="_blank" style="font-size:13px;color:#${theme[0].colorCode};font-family: Helvetica, Arial, sans-serif;text-decoration:none;"><b>www.nimbletank.com</b></a>
                    </td>
                </tr>

                <tr>
                    <td><div style="margin-top:15px; margin-bottom:15px;"></div></td>
                </tr>

                <tr>
                    <td width="100%" height="25">
                        <a href="https://twitter.com/NimbleTank" target="_blank"><img src="https://www.nimbletank.com/static/email-signatures/images/twitter-${theme[0].color}.png" width="25" height="25" alt="Twitter" border="0" style="display:inline;padding-right:2px;" /></a>
                        <a href="https://www.linkedin.com/company/nimbletank" target="_blank"><img src="https://www.nimbletank.com/static/email-signatures/images/linkedin-${theme[0].color}.png" width="25" height="25" alt="Linked In" border="0" style="display:inline;" /></a>
                        <div style="margin-top: 14px; margin-bottom: 15px;">
                            <img src="https://www.nimbletank.com/static/email-signatures/images/div-${theme[0].color}.png">
                        </div>
                    </td>
                </tr>

                <tr>
                    <td width="100%"><font face="Helvetica, Arial, sans-serif" size="2" color="b3bfc1" style="font-size:16px;color:#b3bfc1;">Most awarded UK Mobile Agency</font></td>
                </tr>

                <tr>
                    <td width="100%" class="awards">
                        <div style="margin-top: 5px;"></div>
                        <img src="https://www.nimbletank.com/static/email-signatures/images/logo-1.png" width="105" height="57" alt="Awards" border="0" style="display:inline;padding-right:10px;" />
                        <img src="https://www.nimbletank.com/static/email-signatures/images/logo-2.png" width="96" height="57" alt="Awards" border="0" style="display:inline;padding-right:10px;" />
                        <img src="https://www.nimbletank.com/static/email-signatures/images/logo-3.png" width="144" height="57" alt="Awards" border="0" style="display:inline;padding-right:10px;" />
                        <img src="https://www.nimbletank.com/static/email-signatures/images/logo-4.png" width="112" height="57" alt="Awards" border="0" />
                        <img src="https://www.nimbletank.com/static/email-signatures/images/logo-5.png" width="137" height="57" alt="Awards" border="0" />
                    </td>
                </tr>

            </table>

        </td>
    </tr>
</table>`

        const noMobileTemplate = `<table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt" width="100%">
    <tr>
        <td width="100%" style="width:100%;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%;">
                <tr>
                    <td width="100%">
                        <font face="Helvetica, Arial, sans-serif" size="2" color="53585f" style="font-size:25px"><strong>${this.state.nameValue}</strong><br></font>
                        <font face="Helvetica, Arial, sans-serif" size="2" color="${theme[0].colorCode}" style="font-size:13px">${this.state.titleValue}</font>

                            <div style="margin-top: 15px;"></div>

                            <a href="https://www.nimbletank.com" target="_blank"><img src="https://www.nimbletank.com/static/email-signatures/images/nt-logo-${theme[0].color}.png" width="68" height="68" alt="Nimbletank" border="0" style="display:block" />

                            <div style="margin-top: 15px;"></div>

                        </a>

                        <font face="Helvetica, Arial, sans-serif" size="2" color="${theme[0].colorCode}" style="font-size:13px"><strong>t.</strong></font> <font face="Helvetica, Arial, sans-serif" size="2" color="53585f" style="font-size:13px">0203 8286440</font> &nbsp;

                        <div style="margin-top: 15px; margin-bottom: 15px;">
                            <img src="https://www.nimbletank.com/static/email-signatures/images/div-${theme[0].color}.png">
                        </div>


                        <font face="Helvetica, Arial, sans-serif" size="2" color="53585f" style="font-size:13px"><b>Nimbletank</b></strong></font><font face="Helvetica, Arial, sans-serif" size="2" color="53585f" style="font-size:13px"> Sweeps Building, 6-7 St Cross St, London, EC1N 8UA<br></font>
                        <a href="https://www.nimbletank.com" target="_blank" style="font-size:13px;color:#${theme[0].colorCode};font-family: Helvetica, Arial, sans-serif;text-decoration:none;"><b>www.nimbletank.com</b></a>
                    </td>
                </tr>

                <tr>
                    <td><div style="margin-top:15px; margin-bottom:15px;"></div></td>
                </tr>

                <tr>
                    <td width="100%" height="25">
                        <a href="https://twitter.com/NimbleTank" target="_blank"><img src="https://www.nimbletank.com/static/email-signatures/images/twitter-${theme[0].color}.png" width="25" height="25" alt="Twitter" border="0" style="display:inline;padding-right:2px;" /></a>
                        <a href="https://www.linkedin.com/company/nimbletank" target="_blank"><img src="https://www.nimbletank.com/static/email-signatures/images/linkedin-${theme[0].color}.png" width="25" height="25" alt="Linked In" border="0" style="display:inline;" /></a>
                        <div style="margin-top: 14px; margin-bottom: 15px;">
                            <img src="https://www.nimbletank.com/static/email-signatures/images/div-${theme[0].color}.png">
                        </div>
                    </td>
                </tr>

                <tr>
                    <td width="100%"><font face="Helvetica, Arial, sans-serif" size="2" color="b3bfc1" style="font-size:16px;color:#b3bfc1;">Most awarded UK Mobile Agency</font></td>
                </tr>

                <tr>
                    <td width="100%" class="awards">
                        <div style="margin-top: 5px;"></div>
                        <img src="https://www.nimbletank.com/static/email-signatures/images/logo-1.png" width="105" height="57" alt="Awards" border="0" style="display:inline;padding-right:10px;" />
                        <img src="https://www.nimbletank.com/static/email-signatures/images/logo-2.png" width="96" height="57" alt="Awards" border="0" style="display:inline;padding-right:10px;" />
                        <img src="https://www.nimbletank.com/static/email-signatures/images/logo-3.png" width="144" height="57" alt="Awards" border="0" style="display:inline;padding-right:10px;" />
                        <img src="https://www.nimbletank.com/static/email-signatures/images/logo-4.png" width="112" height="57" alt="Awards" border="0" />
                        <img src="https://www.nimbletank.com/static/email-signatures/images/logo-5.png" width="137" height="57" alt="Awards" border="0" />
                    </td>
                </tr>

            </table>

        </td>
    </tr>
</table>`

        const emailTemplate = this.state.mobileValue ? template : noMobileTemplate

        return (
            <MasterLayout>
                <SiteContainer>
                    <FormRow label={this.nameLabel} value={this.state.nameValue} onChange={this.onInputName} placeholder={this.namePlaceholder} type='input'/>
                    <FormRow label={this.titleLabel} value={this.state.titleValue} onChange={this.onInputTitle} placeholder={this.titlePlaceholder} type='input'/>
                    <FormRow label={this.mobileLabel} value={this.state.mobileValue} onChange={this.onInputMobile} placeholder={this.mobilePlaceholder} type='input'/>
                    <FormRow label={this.departmentLabel} value={this.state.departmentValue}
                             options={this.departmentList} onChange={this.onSelectDepartment} type='select'/>

                    <div className="container">
                        {/*<div className="col">
                            <div className='html-code'>
                                <Highlight languages={['html']}>{emailTemplate}</Highlight>
                            </div>
                        </div>*/}

                        <div className="col">
                            <div className='html-viewer' dangerouslySetInnerHTML={{__html: emailTemplate}} />
                        </div>

                        {/**
                         * Build version
                         */}
                    </div>

                    {/*<div className='button-container'>
                        <CopyToClipboard text={emailTemplate} onCopy={this.onCopy}>
                            <button>{this.buttonLabel}</button>
                        </CopyToClipboard>

                        {this.state.copied ? <span className='message-copied'>{this.htmlCopiedLabel}</span> : ''}
                    </div>*/}
                </SiteContainer>
            </MasterLayout>
        )
    }
}

export default Index;
