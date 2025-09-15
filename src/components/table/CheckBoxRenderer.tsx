const CheckBoxRenderer = (value: string | boolean) => {
    return (
        <div className="ag-cell-wrapper ag-checkbox-cell">
            <div className="ag-labeled ag-label-align-right ag-checkbox ag-input-field ag-disabled">
                <div className={`${value ? "ag-checked" : ""} ag-wrapper ag-input-wrapper ag-checkbox-input-wrapper ag-disabled`}>
                    <input
                        type="checkbox"
                        checked={!!value}
                        disabled
                        className="ag-input-field-input ag-checkbox-input"
                        style={{ pointerEvents: "none", height: "1rem", width: "1rem" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CheckBoxRenderer;
