import React          from 'react';
import classnames     from 'classnames';
import connectField   from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import joinName       from 'uniforms/joinName';
import {Children}     from 'react';

import ListAddField  from './ListAddField';
import ListItemField from './ListItemField';

const List = ({
    addIcon,
    children,
    className,
    error,
    errorMessage,
    initialCount,
    itemProps,
    label,
    name,
    removeIcon,
    showInlineError,
    value,
    ...props
}) =>
    <section
        className={classnames('panel panel-default', {'panel-danger': error}, className)}
        {...filterDOMProps(props)}
    >
        <section className="panel-body">
            {label && (
                <section className={classnames('panel-heading', {'has-error': error})}>
                    <label className="control-label">
                        {label}&nbsp;
                    </label>

                    <ListAddField name={`${name}.$`} initialCount={initialCount} addIcon={addIcon} />

                    {!!(errorMessage && showInlineError) && (
                        <span className="help-block">
                            {errorMessage}
                        </span>
                    )}
                </section>
            )}

            {children ? (
                value.map((item, index) =>
                      Children.map(children, child =>
                           React.cloneElement(child, {
                               key: index,
                               label: null,
                               name: joinName(name, child.props.name && child.props.name.replace('$', index)),
                               removeIcon
                           })
                      )
                 )
            ) : (
                value.map((item, index) =>
                    <ListItemField
                        key={index}
                        label={null}
                        name={joinName(name, index)}
                        removeIcon={removeIcon}
                        {...itemProps}
                    />
                )
            )}
        </section>
    </section>
;

export default connectField(List, {includeInChain: false});
