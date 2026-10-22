"""Reviewed functions used by documentation recipes.

WranglesPY loads this file for every recipe. Keep module loading side-effect free.
Generic tutorial placeholders (function_name, my_function) are not implementations.
"""


def sum_times_two(values):
    """Aggregate a group, matching WranglesPY's test_select custom-function test."""
    return sum(values) * 2


def test_fn(Part_Code, value):
    """Append the matrix variable to a part code, including numeric part codes."""
    return str(Part_Code) + str(value)


def reverse_strings(Strings):
    """Row-level implementation from the custom-functions tutorial."""
    return Strings[::-1]


def stock_status_dataframe(df, input, output):
    """Dataframe-level stock message from the custom-functions tutorial."""
    df[output] = df[input] + ' is out of stock'
    return df


def stock_status(Products):
    """Row-level version of the same stock message."""
    return Products + ' is out of stock'


def append_fields(Products, **kwargs):
    """Append the additional values supplied by the tutorial."""
    return ''.join(Products + ' ' + str(value) for value in kwargs.values())


def append_suffix(Products, suffix):
    """Append an explicitly supplied suffix, preserving its whitespace."""
    return Products + suffix


def variable_function(variables):
    """Resolve the column variable used by the variables tutorial."""
    return variables['other_col']


# The matrix connector tutorial records values in memory. WranglesPY loads a
# fresh module per recipe, so this collection is not shared between requests.
test_vals = []


def function(value):
    """Value collector explicitly defined by the matrix connector tutorial."""
    test_vals.append(value)
