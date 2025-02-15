trigger validateAnnualRevenue on Account (before update) {
    for (Account oldAcc : Trigger.old) {
        for (Account acc : Trigger.new) {
            if (acc.Id == oldAcc.Id && acc.AnnualRevenue < oldAcc.AnnualRevenue) {
                acc.addError('Annual Revenue cannot be decreased.');
            }
        }
    }
}
