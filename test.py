import pint
ureg = pint.UnitRegistry()

try:
    weight_quantity = 1 * ureg('lb')
    print(f"1 lb in kg: {weight_quantity.to('kg').magnitude}")
except pint.errors.UndefinedUnitError as e:
    print(f"Error: {e}")