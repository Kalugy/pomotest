const EnableComponent = ({ enableGoal, setEnableGoal, enableFinance, setEnableFinance }) => {
  return (
    <div className="pt-8">
      {/* Checkbox for Goal */}
      <input
        type="checkbox"
        className="radio-input"
        checked={enableGoal} // Two-way binding with state
        onChange={(e) => setEnableGoal(e.target.checked)}
      />
      <label className="text-white" htmlFor="scales">Toggle Goal</label>

      {/* Checkbox for Finance */}
      <input
        type="checkbox"
        className="radio-input"
        checked={enableFinance} // Two-way binding with state
        onChange={(e) => setEnableFinance(e.target.checked)}
      />
      <label className="text-white" htmlFor="scales">Toggle Finance</label>
    </div>
  );
};

export default EnableComponent;
