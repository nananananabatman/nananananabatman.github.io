function MinLengthDirective() {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attr, $ctrl) {
            function lengthValidation(value) {
                if (value.length >= 20) {
                    $ctrl.$setValidity('minLength', true);
                } else {
                    $ctrl.$setValidity('minLength', false);
                }

                return value;
            }

            $ctrl.$parsers.push(lengthValidation);
        }
    };
}

module.exports = MinLengthDirective;
