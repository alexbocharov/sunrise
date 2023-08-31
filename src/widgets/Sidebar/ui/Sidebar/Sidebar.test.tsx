import { fireEvent, screen } from '@testing-library/react';
import { ComponentRender } from 'shared/config/tests/ComponentRender/ComponentRender';
import { Sidebar } from './Sidebar';

describe('Sidebar test', () => {
  it('Test render', () => {
    // const SidebarWithTranslation = withTranslation()(Sidebar);
    // render(<SidebarWithTranslation />);
    ComponentRender(<Sidebar open />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('Test toggle', () => {
    // const SidebarWithTranslation = withTranslation()(Sidebar);
    // render(<SidebarWithTranslation />);
    ComponentRender(<Sidebar open />);
    const toggleBtn = screen.getByTestId('sidebar-toggle');
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
  });
});
