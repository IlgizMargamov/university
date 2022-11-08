using System;
using System.Windows.Forms;
using System.Drawing;
using System.Linq;
using FractalPainting.App.Fractals;
using FractalPainting.Infrastructure.Common;
using FractalPainting.Infrastructure.UiActions;
using Ninject;
using Ninject.Extensions.Factory;
using Ninject.Extensions.Conventions;

namespace FractalPainting.App
{
    public static class DIContainerTask
    {
        public static MainForm CreateMainForm()
        {
            ConfigureContainer().Bind<MainForm>().To<MainForm>();
            return ConfigureContainer().Get<MainForm>();
        }

        public static StandardKernel ConfigureContainer()
        {
            var container = new StandardKernel();

            container.Bind<IDragonPainterFactory>().ToFactory();

            container.Bind<IImageHolder, PictureBoxImageHolder>().To<PictureBoxImageHolder>().InSingletonScope();

            container.Bind<IObjectSerializer>().To<XmlObjectSerializer>().InSingletonScope();
            container.Bind<IBlobStorage>().To<FileBlobStorage>().InSingletonScope();
            container.Bind<IImageSettingsProvider>().To<AppSettings>();

            container.Bind(x => x.FromThisAssembly().SelectAllClasses().InheritedFrom<IUiAction>().BindAllInterfaces());

            container.Bind<AppSettings>().ToMethod(c => c.Kernel.Get<SettingsManager>().Load()).InSingletonScope();
            container.Bind<ImageSettings>().ToMethod(c => c.Kernel.Get<SettingsManager>().Load().ImageSettings)
                .InSingletonScope();
            container.Bind<Palette>().To<Palette>().InSingletonScope();

            return container;
        }
    }

    public class DragonFractalAction : IUiAction
    {
        private readonly Func<DragonSettings, DragonPainter> _createDragonSettings;
        private readonly IDragonPainterFactory _factory;
        public MenuCategory Category => MenuCategory.Fractals;
        public string Name => "Дракон";
        public string Description => "Дракон Хартера-Хейтуэя";

        public DragonFractalAction(Func<DragonSettings, DragonPainter> createDragonSettings)
        {
            _createDragonSettings = createDragonSettings;
        }

        public void Perform()
        {
            var dragonSettings = CreateRandomSettings();
            // редактируем настройки:
            SettingsForm.For(dragonSettings).ShowDialog();
            // создаём painter с такими настройками
            var painter = _createDragonSettings(dragonSettings);
            painter.Paint();
        }

        private static DragonSettings CreateRandomSettings()
        {
            return new DragonSettingsGenerator(new Random()).Generate();
        }
    }

    public class KochFractalAction : IUiAction
    {
        public MenuCategory Category => MenuCategory.Fractals;
        public string Name => "Кривая Коха";
        public string Description => "Кривая Коха";

        private readonly Lazy<KochPainter> painter;

        public KochFractalAction(Lazy<KochPainter> _painter)
        {
            painter = _painter;
        }

        public void Perform()
        {
            painter.Value.Paint();
        }
    }

    public class DragonPainter
    {
        private readonly IImageHolder imageHolder;
        private readonly DragonSettings settings;
        private readonly Palette palette;

        public DragonPainter(IImageHolder imageHolder, DragonSettings settings, Palette palette)
        {
            this.imageHolder = imageHolder;
            this.settings = settings;
            this.palette = palette;
        }

        public void Paint()
        {
            using (var graphics = imageHolder.StartDrawing())
            using (var backColor = new SolidBrush(palette.BackgroundColor))
            {
                var imageSize1 = imageHolder.GetImageSize();
                graphics.FillRectangle(backColor, 0, 0, imageSize1.Width, imageSize1.Height);
                var r = new Random();
                var cosa = (float) Math.Cos(settings.Angle1);
                var sina = (float) Math.Sin(settings.Angle1);
                var cosb = (float) Math.Cos(settings.Angle2);
                var sinb = (float) Math.Sin(settings.Angle2);
                var size1 = Math.Min(imageSize1.Width, imageSize1.Height) / 2.1f;
                var shiftX = settings.ShiftX * size1 * 0.8f;
                var shiftY = settings.ShiftY * size1 * 0.8f;
                var scale = settings.Scale;
                var p = new PointF(0, 0);
                foreach (var i in Enumerable.Range(0, settings.IterationsCount))
                {
                    graphics.FillRectangle(new SolidBrush(i % 2 == 0 ? palette.PrimaryColor : palette.SecondaryColor),
                        imageSize1.Width / 3f + p.X, imageSize1.Height / 2f + p.Y, 1, 1);
                    if (r.Next(0, 2) == 0)
                        p = new PointF(scale * (p.X * cosa - p.Y * sina), scale * (p.X * sina + p.Y * cosa));
                    else
                        p = new PointF(scale * (p.X * cosb - p.Y * sinb) + shiftX,
                            scale * (p.X * sinb + p.Y * cosb) + shiftY);
                    if (i % 100 == 0)
                        imageHolder.UpdateUi();
                }
            }

            imageHolder.UpdateUi();
        }
    }

    public interface IDragonPainterFactory
    {
        DragonPainter CreateDragonPainter(DragonSettings settings);
    }
}