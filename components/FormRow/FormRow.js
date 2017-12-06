import PropTypes from 'prop-types';
import styled from 'react-emotion'
import Input from '../Input'
import Label from '../Label'
import Select from '../Select'

const FormRowWrapper = styled('div')`
  text-align: left;
  display: grid;
  grid-gap: 10px;
  margin-bottom: 10px;
  grid-template-columns: repeat(auto-fill, minmax(100px,1fr) minmax(40%,2fr));
`

export default (props) => {

    let input

    switch (props.type) {
        case 'input':
            input = (<Input name={props.label} value={props.value} onChange={props.onChange} placeholder={props.placeholder}/>)
            break
        case 'select':
            input = ( <Select  name={props.name} value={props.value} options={props.options} onChange={(option) => {props.onChange(option, props.name)}}/> );
            break
    }

    return (
        <FormRowWrapper>
            <Label>
                {props.label}
            </Label>

            {input}
        </FormRowWrapper>
    )
}


FormRowWrapper.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    options: PropTypes.object,
    value: PropTypes.string
};
